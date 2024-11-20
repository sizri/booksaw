

import BooksList from "./Bookscomponents/BooksList"
import Header from "./components/Header"

const BooksPage = ({addShopData}) => {

    return (

        <>
        <Header></Header>
        <BooksList addShopData={addShopData}></BooksList>
        </>
    )
}

export default BooksPage