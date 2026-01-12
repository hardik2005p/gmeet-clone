import './room.css'

export function RoomsPage(){
     
    async function CreateRoom() {
        try{
            const response=await fetch("http://localhost:3000/room",{
                method:"GET",
                
            })
            const data=await response.json();
            const roomCode=data.roomid;
            const roomPassword=data.password;

            alert("Room Created");
            console.log(data);
            console.log(roomCode);
            console.log(roomPassword)


        }
        catch(e)
        {
            console.log(e);
        }

    }
    return (
        <div className="container">
            <div className="card">
                <h1 >Start Meeting</h1>
                <button className="btn create" onClick={CreateRoom}>Create Room</button>
                <button className="btn join">Join Room</button>
            </div>
        </div>

    )
}