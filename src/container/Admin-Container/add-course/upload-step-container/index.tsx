import { FC, useEffect, useState } from "react";
import "./style.css";
import DropdownInputField from "@/components/fields/dropdown-input-field";
import DateInputField from "@/components/fields/start-date-input-field";
import Checkbox from "@/components/checkbox";
import PreviousButton from "@/components/buttons/previous-button";
import NextButton from "@/components/buttons/next-button";
import SuccessPopup from "@/components/popups/success-popup";

interface CourseData {
    basicInfo: {
      courseCode: string;
      courseName: string;
      startDate: string;
      endDate: string;
      category: string;
      learningObjectives: string;
      trainingType:string;
      courseNo:number;
      isActive:Boolean;
      publishDate:Date;
    };
    designationInfo: {
      division: string[];
      designation: string[];
    };
    modules: {
      moduleInfo: {
        moduleFileUrl: string[];
        moduleName: string[];
        moduleNo: string[];
      };
    };
  }

interface UploadStepSectionProps {}

const UploadStepSection: FC<UploadStepSectionProps> = () => {
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //api to fetch all the data related to that courseCode
  const previewData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/admin/dashboard/getCourseByCode/B01", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.status === 200) {
        const data = await response.json();
        setCourseData(data);
        console.log("data", data.modules.moduleInfo);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    previewData();
  }, []);
  

  return (
    <section className="upload-main-section">
      <p className="upload-preview-text">Preview</p>
      {courseData && (
      <div className="upload-div-section">
        <div className="upload-section1">
          <div className="upload-section1-div-sections">
            <label htmlFor="" className="upload-section-labels">
              Category
            </label>
            <input className="input-field-1" readOnly
              value={courseData?.basicInfo?.category || ''}/>
          </div>
          <div className="upload-section1-div-sections">
            <label htmlFor="" className="upload-section-labels">
              Training
            </label>
            <input className="input-field-1" readOnly
              value={courseData?.basicInfo?.trainingType || ''}/>
          </div>
          <div className="upload-section1-div-sections">
            <label htmlFor="" className="upload-section-labels">
              Course Code & Name
            </label>
            <input
              className="input-field-1"
              readOnly
              value={`${courseData?.basicInfo?.courseCode || ''} ${courseData?.basicInfo?.courseName || ''}`}
            />
          </div>
        </div>
        <div className="upload-div-section2">
          <label htmlFor="" className="upload-section-labels">
            Learning Objective
          </label>
          <input
              className="input-field-1"
              readOnly
              value={courseData?.basicInfo?.learningObjectives || ''}
            />
        </div>
 <div className="upload-div-section3">
  <div className="date-input-row">
    <label htmlFor="" className="upload-section-labels">
      Start Date
    </label>
    <br />
    <input
      className="input-field-2"
      readOnly
      value={courseData?.basicInfo?.startDate || ''}
    />
  </div>
  <div className="date-input-row">
    <label htmlFor="" className="upload-section-labels">
      End Date
    </label>
    <br />
    <input
      className="input-field-2"
      readOnly
      value={courseData?.basicInfo?.endDate || ''}
    />
  </div>
</div>

      </div>
      )}
<div className="upload-div-section">
  {courseData && courseData.modules && courseData.modules.moduleInfo && (
    <div className="upload-section2">
      {courseData.modules.moduleInfo.moduleNo.map((moduleNo, index) => (
        <div key={index} className="upload-section2-div-sections">
          <label htmlFor="" className="upload-section-labels">
            Module Number
          </label>
          <input
            className="input-field-1"
            readOnly
            value={moduleNo}
          />
          <label htmlFor="" className="upload-section-labels">
            Module Name
          </label>
          <input
            className="input-field-1"
            readOnly
            value={courseData.modules.moduleInfo.moduleName[index]}
          />
          <div className="upload-section2-uploaded-file">
            <div className="uploaded-video-file">
              {/* <input type="text" className="uploaded-mp4" /> */}
            </div>
            <div className="uploaded-video-file-text">
              <span className="upload-file-name">video.mp4</span>
              <br />
              <span className="upload-file-size">2.2MB</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}


        <div className="upload-section2-course-assessment">
          <p className="upload-course-assessment-text">Course Assessment </p>
          <div>
            <input type="radio" id="assessment" className="upload-assesment-radio-btn"/>
            <label htmlFor="assessment" className="upload-selected-assessment">
              Post Assessment
            </label>
          </div>
        </div>
        <div className="upload-section2">
          <div className="upload-section2-div-sections">
            <label htmlFor="" className="upload-section-labels">
              Assessment Number
            </label>
            {/* <InputField readOnly moduleName={[]} onChange={function (newModuleName: string[]): void {
              throw new Error("Function not implemented.");
            } } /> */}
            {/* <InputField/> */}
          </div>
          <div className="upload-section2-div-sections">
            <label htmlFor="" className="upload-section-labels">
              Assessment Name
            </label>
            {/* <InputField readOnly moduleName={[]} onChange={function (newModuleName: string[]): void {
              throw new Error("Function not implemented.");
            } } /> */}
            {/* <InputField/> */}
          </div>
        
        </div>
      </div>
      <div className="upload-div-checkbox-main-section">
        <div className="upload-main-div-section">
          <div className="upload-text-section">
            <p className="upload-text">Divisions </p>
          </div>
          <div className="upload-checkbox-section">
            {/* <Checkbox text={"CDC"} />
            <Checkbox text={"Nuventa"} />
            <Checkbox text={"Revance"} /> */}
          </div>
        </div>

        <div className="upload-main-div-section">
          <div className="upload-text-section">
            <p className="upload-text"> Designation</p>
          </div>
          <div className="upload-checkbox-section2">
            {/* <Checkbox text={"Cluster Head- Cardiac"} />
            <Checkbox text={"Cluster Head- Ophthal"} />
            <Checkbox text={"Cluster Head- Derma"} />
            <Checkbox text={"Cluster Head- Pain"} />

            <Checkbox text={"SO"} /> */}
          </div>
          {/* <div className="upload-btn-section">
            <PreviousButton text={"Previous"} />
            <div onClick={handleUploadClick}>
              <NextButton text={"Upload"} />
            </div>
          </div> */}
      
        </div>
      </div>

     
     <SuccessPopup  open={isModalOpen} onClose={handleCloseModal}/>
    </section>
  );
};

export default UploadStepSection;
