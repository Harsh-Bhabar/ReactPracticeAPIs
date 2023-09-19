import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [toggleTable, setToggleTable] = useState(true);

  const usersApi = "https://jsonplaceholder.typicode.com/users";
  const postsApi = "https://jsonplaceholder.typicode.com/posts";

  const fetchAllUsers = async () => {
    if(isFirstTime){
      try {
        setIsLoading(true);
        const response = await fetch(usersApi);
        if (response.status === 200) {
          const data = await response.json();
          setUsers(data);
          fetchAllPosts();
        }
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
      finally {
        setIsFirstTime(false);
        setIsLoading(false);
      }
    }else{
      setToggleTable(!toggleTable);
    }
  };

  const fetchAllPosts = async () => {
    try{
      const response = await fetch(postsApi);
      if(response.status === 200){
        const data = await response.json();
        setPosts(data);
      }
    }
    catch(err){
      console.log(err);
    }
  }

  const getPostsCount = (userId) => {
    let cnt = 0;
    posts.map((post) => {
      if(post.userId === userId){
        cnt++;
      }
    });
    return cnt;
  }

  return (
    <div className="">
      <button onClick={fetchAllUsers}>Fetch All Users</button>

      {
        isLoading ? ("Loading...") : (
            toggleTable && users.length !== 0 ? (
              <table id="usersTable">
                <tbody>
                  <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>username</th>
                  <th>email</th>
                  <th>companyName</th>
                  <th>totalPosts</th>
                  </tr>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.company.name}</td>
                      <td>{getPostsCount(user.id)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              ""
            )
        )
      }

    </div>
  );
}

export default App;
