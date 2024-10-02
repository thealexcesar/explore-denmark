const jsonServer = require('./node_modules/json-server');
const jwt = require('jsonwebtoken');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const PORT = 3000;

const SECRET_KEY = 'tchukitchuki';
const expiresIn = '1h';

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => (decode !== undefined ? decode : err));
}

function isAuthenticated({ email, password }) {
  const users = router.db.get('users').value();
  return users.find(user => user.email === email && user.password === password);
}

server.use(middlewares);

server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  const user = isAuthenticated({ email, password });
  if (!user) {
    res.status(401).json({ message: 'Credenciais inválidas!' });
    return;
  }
  const token = createToken({ email: user.email, role: user.roles });
  res.status(200).json({ accessToken: token, user });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  const token = req.headers.authorization;

  if (token === undefined) {
    res.status(401).json({ message: 'Token não fornecido!' });
  } else {
    try {
      const verified = verifyToken(token.split(' ')[1]);
      (verified instanceof Error) ? res.status(401).json({ message: 'Token inválido!' }) : next();
    } catch (error) {
      res.status(401).json({ message: 'Token inválido!' });
    }
  }
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port: ${PORT}`);
});
