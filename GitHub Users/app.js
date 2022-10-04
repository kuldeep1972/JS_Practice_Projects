//Init GitHub
const github = new Github()
const ui = new UI()

//Search Input
const searchUser = document.getElementById('searchUser')

//Search Input Event Listner
searchUser.addEventListener('keyup',(e)=>{

  //Get the input text
  let userText = e.target.value
  // let user1 = searchUser.value

  if (userText!=""){
    //Make Http call    
    github.getUser(userText)
    .then(data=>{
      if (data.profile.message === 'Not Found'){
          //Show Alert
          ui.showAlert('User not found', 'alert alert-danger')
      }
      else{
        //Show Profile       
        ui.showProfile(data.profile)     
        ui.showRepos(data.repos)



        //Show Repos
        // github.getRepos(data.profile.repos_url)
        // .then(data => {
          
        //   console.log(data)
        // })
      }
    })
  }
  else{
    //Clear Profile
    ui.clearProfile()
  }



});