import { FunctionComponent } from "react";
import "./style.css"
import NextButton from "@/components/buttons/next-button";
import Checkbox from "@/components/checkbox";

interface FilterPopupProps {

}

const FilterPopup: FunctionComponent<FilterPopupProps> = () => {


    return (
        <div className="filter-popup-main-section">
            <div className="filter-popup-heading-part">
                <span className="filter-popup-heading-text">Filter By</span>
                <NextButton text="Apply" width="117px" />
            </div>
            <div className="filter-popup-checkbox-part">
                <span className="filter-popup-headquarter-text">Headquarter</span>
                <div className="filter-popup-checkbox-group">
                    <div className="filter-popup-divclass">
                        <Checkbox isChecked={false} text="Pune" />
                    </div>
                    <div className="filter-popup-divclass">
                        <Checkbox isChecked={false} text="Nashik" />
                    </div>
                    <div className="filter-popup-divclass">
                        <Checkbox isChecked={false} text="Mumbai" />
                    </div>
                    <div className="filter-popup-divclass">
                        <Checkbox isChecked={false} text="Gujarat" />
                    </div>
                </div>
            </div>
            <div className="filter-popup-dropdown-part">
                <div className="filter-popup-dropdown-category">
                    <span className="filter-popup-dropdown-span">Select Category</span>
                    <select className="filter-popup-select-element">
                        <option className="filter-popup-select-option">Competency Based Skills</option>
                        <option className="filter-popup-select-option">Competency Based Skills</option>
                        <option className="filter-popup-select-option">Competency Based Skills</option>
                        <option className="filter-popup-select-option">Competency Based Skills</option>
                        <option className="filter-popup-select-option">Competency Based Skills</option>
                    </select>
                </div>
                <div className="filter-popup-dropdown-training">
                    <span className="filter-popup-dropdown-span">Select Training</span>
                    <select className="filter-popup-select-element">
                        <option className="filter-popup-select-option">Business Orientation</option>
                        <option className="filter-popup-select-option">Business Orientation</option>
                        <option className="filter-popup-select-option">Business Orientation</option>
                        <option className="filter-popup-select-option">Business Orientation</option>
                        <option className="filter-popup-select-option">Business Orientation</option>
                    </select>
                </div>
            </div>
            <div className="filter-popup-coursecode-name">
                <span className="filter-popup-selectcourse-name">Select Course Code & Name</span>
                <select className="filter-popup-coursecode-select">
                    <option className="filter-popup-select-option">BO1 Business Etiquette</option>
                </select>
            </div>
            <div className="filter-popup-bottom-div">
                <div className="filter-popup-sub-parent">
                    <div className="filter-popup-bottom-parent">
                        <span className="filter-popup-bottom-span-category ">Selected Category - </span>
                    </div>
                    <div className="filter-popup-bottom-child">
                        <span className="filter-popup-bottom-span">Business Orientation</span>
                        <span className="filter-popup-bottom-span">Medical Updates</span>
                    </div>
                </div>

                <div className="filter-popup-sub-parent">
                    <div className="filter-popup-bottom-parent">
                        <span className="filter-popup-bottom-span-category ">Selected Training   -  </span>
                    </div>
                    <div className="filter-popup-bottom-child">
                        <span className="filter-popup-bottom-span">Business Etiquette</span>
                        <span className="filter-popup-bottom-span">Update 01</span>
                    </div>
                </div>
                <div className="filter-popup-sub-parent">
                    <div className="filter-popup-bottom-parent">
                        <span className="filter-popup-bottom-span-category ">Selected Course    - </span>
                    </div>
                    <div className="filter-popup-bottom-child">
                        <span className="filter-popup-bottom-span">Competency Based Skills</span>
                        <span className="filter-popup-bottom-span">Medical</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterPopup;