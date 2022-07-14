export interface FileState {
  uploadState: 'idle' | 'uploading' | 'uploaded' | 'validating' | 'invalid' | 'success';
  errorMessages: ErrorMessages[];
}

export interface ErrorMessages {
  message: string;
  image_files?: [];
  nft_ids?: [];
}

// TODO: Implement interface
export interface Step {
  title: string;
  // TODO: Add Svelte component type
  component: any;
  emoji: string;
  instructions: string;
  onSubmitAction: Function;
  onSubmitText: string;
  state: 'inactive' | 'active' | 'loading' | 'success' | 'error';
}
