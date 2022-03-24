import { useEffect, useState } from "react";
import axios from "axios";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [count, setCount] = useState(20);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErrors(false);
        const {
          data: { results },
        } = await axios(`https://randomuser.me/api/?results=${count}`);
        setLoading(false);
        setErrors(false);
        console.log(results);
        setUsers(results);
      } catch (error) {
        console.log(error);
        setErrors(true);
        setLoading(false);
      }
    })();
  }, [count]);

  return (
    <>
      <main>
        <h2>Enter the amount of users you would like to request</h2>
        <input
          type="text"
          id="input"
          pattern="[0-9]*"
          value={count}
          onChange={(e) => {
            setCount(e.target.value);
          }}
          placeholder={count}
        ></input>
        <button onClick={() => setCount(28)}>Show 28 users</button>
        <br />
        <button onClick={() => setCount((prevCount) => prevCount + 2)}>
          Add 2
        </button>
        {errors && <p>ERROR GAST!</p>}
        {loading && <p>Loading users...</p>}
        <section>
          {users.map(({ name: { title, first, last }, picture }, index) => (
            <aside key={index}>
              <p>{index + 1}:</p>
              <p>
                {title}. {first} {last}
              </p>
              <img src={picture.large}></img>
            </aside>
          ))}
        </section>
      </main>
    </>
  );
};

export default User;
