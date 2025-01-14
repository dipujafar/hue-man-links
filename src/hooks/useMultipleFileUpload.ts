import { Error_Modal } from "@/components/modals/modals";
import { useMultipleFileUploadMutation } from "@/redux/api/fileUploadApi";
import { TError } from "@/types";

const useMultipleFileUpload: () => [Function, boolean] = () => {
  const [uploadFile, { isLoading: isUploading }] =
    useMultipleFileUploadMutation();
  const upload = async (file: File[]) => {
    try {
      const formData = new FormData();
      file.forEach((item) => formData.append("files", item));
      return await uploadFile(formData).unwrap();
    } catch (error: TError | any) {
      Error_Modal({ title: error?.data?.message });
    }
  };
  return [upload, isUploading];
};
export default useMultipleFileUpload;
