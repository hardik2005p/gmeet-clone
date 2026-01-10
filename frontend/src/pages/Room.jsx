import './room.css'

export function RoomsPage(){
    let roomCode,roomPassword;
    async function CreateRoom() {
        try{
            const response=await fetch("http://localhost:3000/room",{
                method:"GET",
                
            })
            const data=await response.text();
            roomCode=data.code;
            roomPassword=data.password;
            alert("Room Created")
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