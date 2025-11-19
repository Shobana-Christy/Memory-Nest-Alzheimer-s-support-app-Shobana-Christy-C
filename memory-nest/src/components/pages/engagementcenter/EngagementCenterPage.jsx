import { Link } from "react-router";
import Tile from "../../common/Tile";


const EngagementCenterPage = () => {
    const engagements = [
        {
            id: 1,
            name: "Brain Teaser - Chess",
            source: "https://chess.com"
        },
        {
            id: 2,
            name: "Suduko",
            source: "https://sudoku.com/"
        },
       
    ];
    return (
        <main>
            <div className="main-page-header">

                <div className="sub-nav">
                    <Link to="/home" className="link">Home</Link>
                </div>

                <h3>Engagement Center</h3>
            </div>

          {
            engagements.map((engagement) => (
                <Link className="link" key={engagement.id} to={engagement.source} target="_blank"> 
                    <Tile text={engagement.name} />
                </Link>
            ))
          }
        
        </main>
    )
}
export default EngagementCenterPage;