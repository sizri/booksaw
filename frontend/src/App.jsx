import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import BooksPage from "./BooksPage";
import { useState,useEffect } from "react";
import PurchasePage from "./PurchasePage"
import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import CreateBook from "./productcomponents/CreateBook";
import SignUp from "./usercomponents/SignUp";
import AdminList from "./Bookscomponents/AdminList";
import BookEdit from "./editcomponents/BookEdit";
import UserList from "./usercomponents/UserList";


function App() {
  const [shopData, setshopData] = useState(() =>{
    const data = sessionStorage.getItem('shopData');
    return data ? JSON.parse(data) : []

});

useEffect(() => {
  sessionStorage.setItem('shopData', JSON.stringify(shopData));
  console.log("app useeffect")
}, [shopData]);
 

  const addShopData = (data) => {
    setshopData((prevShopData) => {
      const isExisting = prevShopData.some((item) => item.productId === data.productId);
  
      if (isExisting) {
        // id가 같은 객체가 있다면 count를 증가시키거나 count가 없으면 1로 설정
        return prevShopData.map((item) =>
          item.productId === data.productId
            ? { ...item, count: item.count ? item.count + 1 : 1 }
            : item
        );
      } else {
        // id가 같은 객체가 없다면 새로운 객체 추가
        return [...prevShopData, { ...data, count: 1 }];
      }
    });
  };
  
  const deleteShopData = (data) => {
    console.log("del")
    setshopData((prevShopData) => 
      prevShopData.filter((item) => item.productId !== data.productId)
    );
  };

  const decShopData = (data) => {
    console.log("dec")
    return setshopData((prevShopData) =>
       prevShopData.map((item) => 
      item.productId === data.productId && item.count > 1
      ? {...item, count: item.count-1}
      : item 
      )
    )
  }

  const incShopData = (data) => {
    console.log("inc")
    return setshopData((prevShopData) =>
       prevShopData.map((item) => 
      item.productId === data.productId
      ? {...item, count: item.count+1}
      : item 
      )
    )
  }
   
  const clearShopData = () => {
    setshopData([]);
    sessionStorage.clear();
  };

  
  return (
    <AuthProvider>
      <ProductProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home addShopData={addShopData} shopData={shopData}/>} />
        <Route path="/books" element={<BooksPage addShopData={addShopData} />} />
        <Route path="/purchase" element={<PurchasePage shopData={shopData} deleteShopData={deleteShopData} incShopData={incShopData} decShopData={decShopData} clearShopData={clearShopData}/>}/>
        <Route path="/insert" element={<CreateBook/>}></Route>
        <Route path="/SignUp" element={<SignUp/>}></Route>
        <Route path="/bookmanage" element={<AdminList/>}></Route>
        <Route path="/bookedit/:bookid" element={<BookEdit/>}></Route>
        <Route path="/usermanage" element={<UserList/>}></Route>
  

      </Routes>
    </BrowserRouter>
    </ProductProvider>
    </AuthProvider>
  );

}

export default App
