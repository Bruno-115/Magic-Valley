import MainPage from './MainPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RouterLayout from './RouterLayout';
import Cart from './Cart';
import SearchProduct  from './Search'
import LoginUser from './Login';
import Historic from './LoginPageComp/Historic';
import Sell from './LoginPageComp/Sell';
import Register from './Register';

const router = createBrowserRouter([
   {
      path:'/',
      element:<RouterLayout/>,
      errorElement:null,
      children:[{
         index:true,
         element: <MainPage />
      },
      {
         path:'Login',
         element: <LoginUser />,
         children:[{
            path:'Historico',
            element:<Historic />
         },{
            path:'Vender',
            element:<Sell />
         }]
      },
      {
         path:'Cadastro',
         element: <Register />
      },
      {
         path:'Cart',
         element:<Cart />
      },
      {
         path:'Search',
         element:<SearchProduct />
      }]
   }
])

function App(){
   return <RouterProvider router={router}/>
}

export default App;
