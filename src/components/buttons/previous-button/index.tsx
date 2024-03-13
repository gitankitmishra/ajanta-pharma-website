import { FC } from "react";
import "./style.css"

interface PreviousButtonProps {
    
}
 
const PreviousButton: FC<PreviousButtonProps> = () => {
    return (<div>
        <button className="previous-btn">Previous</button>
    </div>  );
}
 
export default PreviousButton;