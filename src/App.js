import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashbroad from "./pages/Dashbroad";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import Bloglist from "./pages/Bloglist";
import Blogcatlist from "./pages/Blogcatlist";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Productlist from "./pages/Productlist";
import Brandlist from "./pages/Brandlist";
import Categorylist from "./pages/Categorylist";
import Colorlist from "./pages/Colorlist";
import Addblog from "./pages/Addblog";
import Addblogcat from "./pages/Addblogcat";
import Addcolor from "./pages/Addcolor";
import Addcat from "./pages/Addcat";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashbroad />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="blog" element={<Addblog />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="blog-category" element={<Addblogcat />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customer" element={<Customers />} />
          <Route path="product" element={<Addproduct />} />
          <Route path="product-list" element={<Productlist />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="list-brand" element={<Brandlist />} />
          <Route path="category" element={<Addcat />} />
          <Route path="list-category" element={<Categorylist />} />
          <Route path="color" element={<Addcolor />} />
          <Route path="list-color" element={<Colorlist />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
