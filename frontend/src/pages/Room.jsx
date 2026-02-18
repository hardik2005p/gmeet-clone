import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./room.css";

export function RoomsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (!location.state || !location.state.Email) {
      alert("Enter Email address");
      navigate("/login");
    } else {
      setEmail(location.state.Email);
    }
  }, [location.state, navigate]);

  async function CreateRoom() {
    try {
      const response = await fetch("http://localhost:3000/room");
      const data = await response.json();

      navigate(`/meetingRoom/${data.roomid}`, {
        state: {
          roomid: data.roomid,
          roomPassword: data.password,
          email,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  function joinRoom() {
    navigate("/join");
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Start Meeting</h1>
        <button className="btn create" onClick={CreateRoom}>
          Create Room
        </button>
        <button className="btn join" onClick={joinRoom}>
          Join Room
        </button>
      </div>
    </div>
  );
}
