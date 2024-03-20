import { FC } from "react";
import "./style.css"

interface PreviousButtonProps {
    text: string;
    width?: string;
}
 
const PreviousButton: FC<PreviousButtonProps> = ({text ,width}) => {
    return (<div>
        <button className="previous-btn" style={{width:width}}>{text}</button>
    </div>  );
}
 
export default PreviousButton;