export type CourseDetails = {
    _id: string;
    course_basic: {
        course_category: string,
        course_code: string,
        course_name: string,
        isActive: boolean,
        publishDate: string,
    }
}