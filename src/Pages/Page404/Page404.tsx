import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className="title page404">
      <h2>Welcome to the page which is never found but always shown</h2>
      <h1>404</h1>
      <button onClick={() => navigate('/')} className="btn btn-danger">Return from Narnia</button>
    </div>
  );
};

export default Page404;
