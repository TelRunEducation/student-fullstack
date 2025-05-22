import type {FetchBaseQueryError} from '@reduxjs/toolkit/query'
import type {SerializedError} from '@reduxjs/toolkit'

type Props = {
  error : FetchBaseQueryError | SerializedError
}

const RequestError = ({error}: Props) => {
  let displayMessage = ''
  if ('status' in error) {
    displayMessage = `${error.status}: ${error.data} `
  } else {
    displayMessage = `${error.code}: ${error.message} `
  }
  return (
    <>
      <h1>Error while server request</h1>
      <h2>{displayMessage}</h2>
    </>
  );
};

export default RequestError;