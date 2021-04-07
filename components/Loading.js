import { Circle } from "better-react-spinkit";

function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <img
          src="/icon.png"
          height={200}
          styles={{ marginBottom: 10 }}
          alt=""
        />
        <Circle color="#222" size={40} />
      </div>
    </center>
  );
}

export default Loading;
