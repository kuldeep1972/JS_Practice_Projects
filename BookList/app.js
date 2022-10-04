//Book Constructor
function Book(title, author , isbn){
  this.title = title
  this.author = author
  this.isbn = isbn
}


//UI Constructor
function UI(){}

//UI Prototype methods
UI.prototype.addBookToList = function(book){
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

UI.prototype.showAlert = function(msg,className){
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

//Clears the field after adding the book to booklist.
UI.prototype.clearFields = function(){
  document.getElementById('title').value='';
  document.getElementById('author').value='';
  document.getElementById('isbn').value='';
}

UI.prototype.deleteBook = function(target){
  if (target.className === 'delete')
  {
    target.parentElement.parentElement.remove()
  }
}



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
  }

  e.preventDefault();
})


//EL to remove book
document.getElementById('booklist').addEventListener('click',function(e){
    //Instantiate UI object
    const ui = new UI()

    //Delete Book
    ui.deleteBook(e.target)
    //Show message
    ui.showAlert('Book Removed','success')
    e.preventDefault()
});