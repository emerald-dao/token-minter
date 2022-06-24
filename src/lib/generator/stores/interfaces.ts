export interface FileState {
  uploadState: 'idle' | 'uploading' | 'uploaded' | 'validating' | 'invalid' | 'success';
  errorMessages: ErrorMessages[];
}

export interface ErrorMessages {
  message: string;
  image_files?: [];
  nft_ids?: [];
}
