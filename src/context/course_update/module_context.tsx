"use client"
import { ReactNode, createContext, useEffect, useState } from "react"

interface ModuleData {
    module_name: string;
    module_no: string;
    files: FileList | null;
}

 export type Course_Assessment = {
  course_assessment: {
    assessment_no: number;
    assessment_name: string;
    assessment_category: string;
    assessment_position: string; //pre | post
    assessment_type: string; //"single" | "multiple" | "boolean" | "short";
    assessment_data: {
      question_no: number;
      question_value: string;
      question_option: {
        single?: string[];
        multiple?: string[];
        boolean?: null;
        short?: null;
      };
      question_answer: {
        single?: string;
        multiple?: string[];
        boolean?: boolean;
        short?: null;
      };
    }[];
  }[];
}

export const ModuleContext = createContext<any | null>(null);

 const ModuleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [modules, setModules] = useState<ModuleData[]>([
        { module_name: "", module_no: "", files: null },
    ]);
    const [files, setFiles] = useState<FileList | null>(null);

    
    //module number
    const handleChangeModuleNum = (newModuleNum: string[], index: number) => {
        console.log("Changing module number...");
        setModules((prevModules) => {
          const updatedModules = [...prevModules];
          updatedModules[index].module_no = newModuleNum[0];
          return updatedModules;
        });
    };
    
    //module name
    const handleChangeModuleName = (newmodule_name: string[], index: number) => {
        console.log("Changing module name...");
        setModules((prevModules) => {
          const updatedModules = [...prevModules];
          updatedModules[index].module_name = newmodule_name[0];
          return updatedModules;
        });
    };
    
    //module file handle
    const handleFileSelect = (selectedFiles: FileList | null, index: number) => {
        console.log("Selecting files for module...");
        setModules((prevModules) => {
          const updatedModules = [...prevModules];
          if (selectedFiles) {
            updatedModules[index].files = selectedFiles;
          }
          return updatedModules;
        });
    };


    //assessment and optional assessment use state
    const [assessment, setAssessment] = useState<Course_Assessment[]>([
      {
        course_assessment: [
          {
            assessment_no: 1, 
            assessment_name: "",
            assessment_category: "",
            assessment_position: "",
            assessment_type: "",
            assessment_data: [
              {
                question_no: 1, 
                question_value: "",
                question_option: {
                  single: [],
                  multiple: [],
                  boolean: null,
                  short: null,
                },
                question_answer: {
                  single: "",
                  multiple: [],
                  boolean: false,
                  short: null,
                },
              },
            ],
          },
        ],
      },
    ]);

     const handlechangeAssessmentName = (assessmentName:string[] , index:number) => {
      // console.log("assesment name",assessmentName);
      // setAssessment((prevAssessment) => {
      //   const updatedAssessment = [...prevAssessment];
      //   updatedAssessment[index].course_assessment.forEach((assessment) => {
      //     assessment.assessment_name = assessmentName[0]
      //     return updatedAssessment;
      //   })
      return "";
    }

    // const uploadFile = async () => {
    //     try {
    //       if (!modules || !modules.length) {
    //         console.error("Module data is missing.");
    //         return;
    //       }
    
    //       const formData = new FormData();
    
    //       // Append files from the 'files' variable
    //       if (files) {
    //         for (let i = 0; i < files.length; i++) {
    //           formData.append("files", files[i]);
    //         }
    //       }
    
    //       // Append module data files
    //       modules.forEach((moduleData:any) => {
    //         formData.append("module_name", moduleData.module_name);
    //         formData.append("module_no", moduleData.module_no);
    //         if (moduleData.files) {
    //           for (let i = 0; i < moduleData.files.length; i++) {
    //             formData.append("files", moduleData.files[i]);
    //           }
    //         }
    //       });
    
    
    //       const response = await fetch(
    //         "https://ajanta-pharma-server.vercel.app/api/admin/dashboard/uploadFile/B01",
    //         {
    //           method: "PUT",
    //           body: formData, 
    //         }
    //       );
    
    //       if (response.status === 200) {
    //         const data = await response.json();
    //         console.log("Upload successful:", data);
    //       }
    //     } catch (error) {
    //       console.error("Error uploading files:", error);
    //     }
    //   };

    //assessment upload
    // const uploadAssessment = async () => {
    //     try {
    //         console.log("Uploading assessment...");
    //         if (!assessment || !assessment.length) {
    //             console.error("assessment data is missing.");
    //             return;
    //         }
    
    //         const formData = new FormData();
    
    //         // Append files from the 'files' variable
    //         if (excelFile) {
    //             for (let i = 0; i < excelFile.length; i++) {
    //                 formData.append("excelFile", excelFile[i]);
    //             }
    //         }
    
    //         // Append module data files
    //         assessment.forEach((assessmentData) => {
    //             formData.append("assessmentFileName", assessmentData.assessmentFileName);
    //             formData.append("assessmentFileType", assessmentData.assessmentFileType);
    //             if (assessmentData.excelFile) {
    //                 for (let i = 0; i < assessmentData.excelFile.length; i++) {
    //                     formData.append("excelFile", assessmentData.excelFile[i]);
    //                 }
    //             }
    //         });
    
    //         //   formData.append("courseCode", courseCode);
    
    //         const response = await fetch(
    //             "https://ajanta-pharma-server.vercel.app/api/admin/dashboard/uploadAssessment/B01",
    //             {
    //                 method: "POST",
    //                 body: formData,
    //             }
    //         );
    
    //         if (response.status === 200) {
    //             const data = await response.json();
    //             console.log("Upload successful:", data);
    //         }
    //     } catch (error) {
    //         console.error("Error uploading files:", error);
    //     }
    // };

    //optional assessment upload radio button handler
   
    
    //optional assessment type
    
    //optional assessment file name
    
    
    //optional assessment file selection
   

    //optional assessment upload api
  //     const uploadoptAssessment = async () => {
  //   try {
  //     if (!assessmentOpt || !assessmentOpt.length) {
  //       console.error("optional assessment data is missing.");
  //       return;
  //     }
  //     const formData = new FormData();
  //     if (optexcelFile) {
  //       for (let i = 0; i < optexcelFile.length; i++) {
  //         formData.append("optexcelFile", optexcelFile[i]);
  //       }
  //     }

  //     const assessmentTypeArray = Array.isArray(selectedAssessment) ? selectedAssessment : [selectedAssessment];
  //     formData.append("assessmentType", JSON.stringify(assessmentTypeArray)); 
  //     assessmentOpt.forEach((optassessmentData) => {
  //       formData.append("assessmentFileName", optassessmentData.assessmentFileName);
  //       formData.append("assessmentFileType", optassessmentData.assessmentFileType);
  //       if (optassessmentData.optexcelFile) {
  //         for (let i = 0; i < optassessmentData.optexcelFile.length; i++) {
  //           formData.append("optexcelFile", optassessmentData.optexcelFile[i]);
  //         }
  //       }
  //     });
  
  //     const response = await fetch(
  //       "https://ajanta-pharma-server.vercel.app/api/admin/dashboard/optAssessment/B01",
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     if (response.status === 200) {
  //       const data = await response.json();
  //       console.log("Upload successful:", data);
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
    
    
    
    //add modules logic handler
    // const handleAddModule = () => {
    //     setModules([...modules, { module_name: "", module_no: "", files: null }]);
    //   };
    //   //add assessment logic handler
    //   const handleAddAssessment = () => {
    //     setAssessmentOpt(prevAssessmentOpt => [
    //       ...prevAssessmentOpt,
    //       { preAssessment: "", postAssessment: "", assessmentFileType: "", assessmentFileName: "" ,optexcelFile:null}
    //     ]);
    //   };

      //MERGE API
      // const mergedApi = () => {
      //   setTimeout(() => {
      //     uploadFile().then(() => {
      //       alert("Module File uploaded successfully");
      //       checkCompletion();
      //     });
      //   }, 2000);
      
      //   setTimeout(() => {
      //     uploadAssessment().then(() => {
      //       alert("Assessment File uploaded successfully");
      //       checkCompletion();
      //     });
      //   }, 4000);
      
      //   const isOptionalDataProvided = true; // Adjust this based on your condition
      
      //   if (isOptionalDataProvided) {
      //     setTimeout(() => {
      //       // Check if assessmentOpt array contains data
      //       if (assessmentOpt && assessmentOpt.length) {
      //         uploadoptAssessment().then(() => {
      //           checkCompletion();
      //         });
      //       }
      //     }, 6000);
      //   }
      // };
      


        
      
useEffect(()=>{
  console.log("Module data",assessment);
  
},[])
    const moduleValue = {
        modules,
        handleChangeModuleNum,
        handleChangeModuleName,
        handleFileSelect,
        // handleAddModule,
        // uploadFile,
        //assessment logic data
        // uploadAssessment,
        //optional assessment logic data
        // handleAddAssessment,
        // mergedApi

    };

    
    console.log("Module Provider rendered with modules:", modules);

    return (
        <ModuleContext.Provider value={moduleValue}>
            {children}
        </ModuleContext.Provider>
    );
};

export default ModuleProvider;