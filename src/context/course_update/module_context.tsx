"use client"

import { ReactNode, createContext, useState } from "react"

interface ModuleData {
    moduleName: string;
    moduleNo: string;
    files: FileList | null;
}

interface AssessmentData {
    assessmentFileName: string;
    assessmentFileType: string;
    excelFile: FileList | null;
  }

  interface optAssessment {
    preAssessment:string;
    postAssessment:string;
    assessmentFileType:string;
    assessmentFileName:string;
    optexcelFile:FileList | null;
  }

export const ModuleContext = createContext<any | null>(null);

 const ModuleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [modules, setModules] = useState<ModuleData[]>([
        { moduleName: "", moduleNo: "", files: null },
    ]);
    const [files, setFiles] = useState<FileList | null>(null);

    //assessment
    const [assessment, setAssessment] = useState<AssessmentData[]>([
        { assessmentFileName: "", assessmentFileType: "", excelFile: null },
    ]);
    const [excelFile,setexcelFile] = useState<FileList | null>(null);

    //optional assessment 
    const [selectedAssessment, setSelectedAssessment] = useState<string>("");
    const [optexcelFile,setoptexcelFile] = useState<FileList | null>(null);
    const [assessmentOpt, setAssessmentOpt] = useState<optAssessment[]>
    ([
      { preAssessment: "", postAssessment: "", assessmentFileType: "", assessmentFileName: "",optexcelFile:null }
    ]);
    //module number
    const handleChangeModuleNum = (newModuleNum: string[], index: number) => {
        console.log("Changing module number...");
        setModules((prevModules) => {
          const updatedModules = [...prevModules];
          updatedModules[index].moduleNo = newModuleNum[0];
          return updatedModules;
        });
    };
    
    //module name
    const handleChangeModuleName = (newModuleName: string[], index: number) => {
        console.log("Changing module name...");
        setModules((prevModules) => {
          const updatedModules = [...prevModules];
          updatedModules[index].moduleName = newModuleName[0];
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
    const uploadFile = async () => {
        try {
          if (!modules || !modules.length) {
            console.error("Module data is missing.");
            return;
          }
    
          const formData = new FormData();
    
          // Append files from the 'files' variable
          if (files) {
            for (let i = 0; i < files.length; i++) {
              formData.append("files", files[i]);
            }
          }
    
          // Append module data files
          modules.forEach((moduleData:any) => {
            formData.append("moduleName", moduleData.moduleName);
            formData.append("moduleNo", moduleData.moduleNo);
            if (moduleData.files) {
              for (let i = 0; i < moduleData.files.length; i++) {
                formData.append("files", moduleData.files[i]);
              }
            }
          });
    
    
          const response = await fetch(
            "https://ajanta-pharma-server.vercel.app/api/admin/dashboard/uploadFile/B01",
            {
              method: "PUT",
              body: formData, 
            }
          );
    
          if (response.status === 200) {
            const data = await response.json();
            console.log("Upload successful:", data);
          }
        } catch (error) {
          console.error("Error uploading files:", error);
        }
      };

      //assessment upload type 
      const handleAssessmentTypeChange = (selectedCategory: string, index: number) => {
        console.log(`Changing assessment type at index ${index} to:`, selectedCategory);
        const updatedAssessments = [...assessment];
        updatedAssessments[index] = {
            ...updatedAssessments[index],
            assessmentFileType: selectedCategory
        };
        setAssessment(updatedAssessments);
    };
    
    //assessment upload file name
    const handleAssessmentFileNameChange = (newFileName: string, index: number) => {
        console.log(`Changing assessment file name at index ${index} to:`, newFileName);
        setAssessment((prevAssessment) => {
            const updatedAssessments = [...prevAssessment];
            updatedAssessments[index] = {
                ...updatedAssessments[index],
                assessmentFileName: newFileName
            };
            return updatedAssessments;
        });
    };
      //assessment upload file 
    const handleexcelFileSelect = (selectedFiles: FileList | null, index: number) => {
        console.log(`Selecting files for assessment at index ${index}:`, selectedFiles);
        setAssessment((prevAssessment) => {
            const updatedAssessments = [...prevAssessment];
            if (selectedFiles) {
                updatedAssessments[index].excelFile = selectedFiles;
            }
            return updatedAssessments;
        });
    };
    
    //assessment upload
    const uploadAssessment = async () => {
        try {
            console.log("Uploading assessment...");
            if (!assessment || !assessment.length) {
                console.error("assessment data is missing.");
                return;
            }
    
            const formData = new FormData();
    
            // Append files from the 'files' variable
            if (excelFile) {
                for (let i = 0; i < excelFile.length; i++) {
                    formData.append("excelFile", excelFile[i]);
                }
            }
    
            // Append module data files
            assessment.forEach((assessmentData) => {
                formData.append("assessmentFileName", assessmentData.assessmentFileName);
                formData.append("assessmentFileType", assessmentData.assessmentFileType);
                if (assessmentData.excelFile) {
                    for (let i = 0; i < assessmentData.excelFile.length; i++) {
                        formData.append("excelFile", assessmentData.excelFile[i]);
                    }
                }
            });
    
            //   formData.append("courseCode", courseCode);
    
            const response = await fetch(
                "https://ajanta-pharma-server.vercel.app/api/admin/dashboard/uploadAssessment/B01",
                {
                    method: "POST",
                    body: formData,
                }
            );
    
            if (response.status === 200) {
                const data = await response.json();
                console.log("Upload successful:", data);
            }
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    //optional assessment upload radio button handler
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = event.target;
    
        setSelectedAssessment(prevSelectedAssessment => {
            console.log("Changing selected assessment...");
            let updatedAssessment = prevSelectedAssessment ? prevSelectedAssessment.split(',') : [];
    
            if (updatedAssessment[index] === value) {
                updatedAssessment.splice(index, 1);
            } else {
                updatedAssessment[index] = value;
            }
    
            updatedAssessment = updatedAssessment.filter(Boolean); // Remove empty values
            const updatedAssessmentString = updatedAssessment.join(',');
    
            console.log("Updated selected assessment:", updatedAssessmentString);
            // Return the updated string
            return updatedAssessmentString;
        });
    };
    
    //optional assessment type
    const handleoptAssessmentTypeChange = (selectedCategory: string, index: number) => {
        console.log(`Changing optional assessment type at index ${index} to:`, selectedCategory);
        const updatedoptAssessments = [...assessmentOpt];
        updatedoptAssessments[index] = {
            ...updatedoptAssessments[index],
            assessmentFileType: selectedCategory
        };
        setAssessmentOpt(updatedoptAssessments);
    };
    
    //optional assessment file name
    const handleoptAssessmentFileNameChange = (newFileName: string, index: number) => {
        console.log(`Changing optional assessment file name at index ${index} to:`, newFileName);
        setAssessmentOpt((prevAssessment) => {
            const updatedAssessments = [...prevAssessment];
            updatedAssessments[index] = {
                ...updatedAssessments[index],
                assessmentFileName: newFileName
            };
            return updatedAssessments;
        });
    };
    
    //optional assessment file selection
    const handleoptexcelFileSelect = (selectedFiles: FileList | null, index: number) => {
        console.log(`Selecting files for optional assessment at index ${index}:`, selectedFiles);
        setAssessmentOpt((prevModules) => {
            const updatedModules = [...prevModules];
            if (selectedFiles) {
                updatedModules[index].optexcelFile = selectedFiles;
            }
            return updatedModules;
        });
    };

    //optional assessment upload api
      const uploadoptAssessment = async () => {
    try {
      if (!assessmentOpt || !assessmentOpt.length) {
        console.error("optional assessment data is missing.");
        return;
      }
      const formData = new FormData();
      if (optexcelFile) {
        for (let i = 0; i < optexcelFile.length; i++) {
          formData.append("optexcelFile", optexcelFile[i]);
        }
      }

      const assessmentTypeArray = Array.isArray(selectedAssessment) ? selectedAssessment : [selectedAssessment];
      formData.append("assessmentType", JSON.stringify(assessmentTypeArray)); 
      assessmentOpt.forEach((optassessmentData) => {
        formData.append("assessmentFileName", optassessmentData.assessmentFileName);
        formData.append("assessmentFileType", optassessmentData.assessmentFileType);
        if (optassessmentData.optexcelFile) {
          for (let i = 0; i < optassessmentData.optexcelFile.length; i++) {
            formData.append("optexcelFile", optassessmentData.optexcelFile[i]);
          }
        }
      });
  
    //   formData.append("courseCode", courseCode);
      const response = await fetch(
        "https://ajanta-pharma-server.vercel.app/api/admin/dashboard/optAssessment/B01",
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (response.status === 200) {
        const data = await response.json();
        console.log("Upload successful:", data);
      }
    } catch (error) {
      console.log(error)
    }
  }
    
    
    
    //add modules logic handler
    const handleAddModule = () => {
        setModules([...modules, { moduleName: "", moduleNo: "", files: null }]);
      };
      //add assessment logic handler
      const handleAddAssessment = () => {
        setAssessmentOpt(prevAssessmentOpt => [
          ...prevAssessmentOpt,
          { preAssessment: "", postAssessment: "", assessmentFileType: "", assessmentFileName: "" ,optexcelFile:null}
        ]);
      };

      //MERGE API
      const mergedApi = () => {
        setTimeout(() => {
          uploadFile().then(() => {
            alert("Module File uploaded successfully");
            checkCompletion();
          });
        }, 2000);
      
        setTimeout(() => {
          uploadAssessment().then(() => {
            alert("Assessment File uploaded successfully");
            checkCompletion();
          });
        }, 4000);
      
        const isOptionalDataProvided = true; // Adjust this based on your condition
      
        if (isOptionalDataProvided) {
          setTimeout(() => {
            // Check if assessmentOpt array contains data
            if (assessmentOpt && assessmentOpt.length) {
              uploadoptAssessment().then(() => {
                checkCompletion();
              });
            }
          }, 6000);
        }
      };
      
        
        let completedTasks = 0;
        const checkCompletion = () => {
        completedTasks++;
        if (completedTasks === 3) {
        alert("All functions have been successfully executed.");
        }
      };

    const moduleValue = {
        modules,
        handleChangeModuleNum,
        handleChangeModuleName,
        handleFileSelect,
        handleAddModule,
        uploadFile,
        //assessment logic data
        assessment,
        handleAssessmentFileNameChange,
        handleAssessmentTypeChange,
        handleexcelFileSelect,
        uploadAssessment,
        //optional assessment logic data
        assessmentOpt,
        handleRadioChange,
        handleoptAssessmentTypeChange,
        handleoptAssessmentFileNameChange,
        handleoptexcelFileSelect,
        handleAddAssessment,
        mergedApi

    };

    
    console.log("Module Provider rendered with modules:", modules);

    return (
        <ModuleContext.Provider value={moduleValue}>
            {children}
        </ModuleContext.Provider>
    );
};

export default ModuleProvider;