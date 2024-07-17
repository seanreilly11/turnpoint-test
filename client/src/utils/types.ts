export type TUser = {
    id?: number;
    firstname: string;
    lastname: string;
    dob: string;
    languages: string[];
    funding: string;
};

export const fundingOptions = ["NDIS", "HCP", "CHSP", "DVA", "HACC"];
export const languageOptions = [
    "English",
    "Mandarin",
    "Hindi",
    "Arabic",
    "Vietnamese",
    "Spanish",
    "French",
];
