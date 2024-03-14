import { FC } from "react";
import "./style.css"

interface PreviousButtonProps {
    text: string;
    
}
 
const PreviousButton: FC<PreviousButtonProps> = ({text}) => {
    return (<div>
        <button className="previous-btn">{text}</button>
    </div>  );
}
 
export default PreviousButton;