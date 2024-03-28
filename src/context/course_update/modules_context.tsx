"use client"
import React, { useState, ReactNode, createContext } from "react";


export interface Course_Assessment {
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


  export interface Module {
    course_module: {
      module_no: number;
      module_name: string;
      module_material: string;
      assessment_no: number | null;
    }[];
  }


  