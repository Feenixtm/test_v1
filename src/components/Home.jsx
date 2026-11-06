const Home = (props) => {
    const username = props.username;

    return (
        <div className="flex flex-col gap-2">
            <h1>Welcome back to Logger { username }!</h1>
        </div>
    ); 
};

export default Home;    