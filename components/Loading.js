import { Circle } from "better-react-spinkit";

function Loading() {
  return (
    <center styles={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <img
          src="https://icons-for-free.com/iconfiles/png/512/chat+icon-1320184411998302345.png"
          height={200}
          styles={{ marginBottom: 10 }}
          alt=""
        />
        <Circle color="#222" size={60} />
      </div>
    </center>
  );
}

export default Loading;
