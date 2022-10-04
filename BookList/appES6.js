class Book{
  constructor(title,author,isbn){
    this.title = title,
    this.author = author,
    this.isbn = isbn
  }
}

class UI{

  addBookToList(book){
  // console.log(book);
  const list = document.getElementById('booklist')

  //Create tr element
  const row = document.createElement('tr')

  //Insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class='delete'>X</a></td>`

  //Append row to booklist
  list.appendChild(row)
  }

  showAlert(msg,className){
  //Create div
  const div = document.createElement('div')
  //Add Class
  div.className = `alert ${className}`
  //Add text
  div.appendChild(document.createTextNode(msg))

  //Insert inside this element
  const container = document.querySelector('.container')
  //Insert before this element
  const form = document.querySelector('#book-form')
  //Insert Alert
  container.insertBefore(div,form)

  //Remove alert after 3sec
  setTimeout(function() {
    document.querySelector('.alert').remove()
    
  }, 3000);

  }

  clearFields(){
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';

  }

  deleteBook(target){
    if (target.className === 'delete')
    {
      target.parentElement.parentElement.remove()
    }
  }
}

//Local Storage
class Store{

  static displayBooks(){
    let books = Store.getBooks()

    books.forEach(function(book){
      const ui = new UI()

      ui.addBookToList(book)      
    });

  }

  static addBook(book){
    let books = Store.getBooks()

    books.push(book);

    localStorage.setItem('books',JSON.stringify(books))
  }

  static getBooks(){
    let books;
    if (localStorage.getItem('books') === null){
      books = []
    }
    else{
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static removeBook(isbn){
    let books = Store.getBooks();

    books.forEach(function(book,index){
      if(book.isbn === isbn){
        books.splice(index,1)
      }
    })
    
    localStorage.setItem('books',JSON.stringify(books));

  }

}

//DOM Load Event
document.getElementById('book-form').addEventListener('DOMContentLoaded',Store.displayBooks())
//Event Listeners

//EL to add book
document.getElementById('book-form').addEventListener('submit',function(e){
  //Get Form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  //instantiating a Book
  const book = new Book(title,author,isbn)
  // console.log(book);
  
  //Instantiate UI object
  const ui = new UI()

  //Validate
  if(title===''||author===''||isbn==='')
  {
    //Error alert
    ui.showAlert('Please fill in all details','error')
  }
  else{
    //Add Book to list
    ui.addBookToList(book);

    //Show Success
    ui.showAlert('Book Added','success')

    //Clear fields
    ui.clearFields()

    //Add to local storage //since the method is static we need not create obj
    Store.addBook(book)
  }

  e.preventDefault();
})


//EL to remove book
document.getElementById('booklist').addEventListener('click',function(e){
    //Instantiate UI object
    const ui = new UI()

    //Delete Book
    ui.deleteBook(e.target)

    //Remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    //Show message
    ui.showAlert('Book Removed','success')
    e.preventDefault()
});