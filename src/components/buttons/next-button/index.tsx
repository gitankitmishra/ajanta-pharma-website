import { FC } from "react";
import "./style.css"

interface NextButtonProps {
    
}
 
const NextButton: FC<NextButtonProps> = () => {
    return ( <div>
        <button className="next-button">Next</button>
    </div> );
}
 
export default NextButton;