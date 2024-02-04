import { useUI } from "@/context/ContextUI"; 


export default function LoadingSpinner() {

  const { loading } = useUI();

  return (
    <div className={`${!loading && 'hidden' } w-screen h-screen fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75 z-[60]`} >
      <div className='w-full h-full relative flex flex-col justify-center items-center'>
        <div className="w-full h-full absolute flex justify-center items-center">
          <div className="w-12 h-12 mb-4 border-4 border-t-4 border-color-clear rounded-full loader ease-linear" />
          <style jsx>
            {`
        .loader {
          border-top-color: #0ea5e9;
          -webkit-animation: spinner 1.5s linear infinite;
          animation: spinner 1.5s linear infinite;
        }
        @-webkit-keyframes spinner {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
          }
        }
        @keyframes spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}
          </style>
        </div>
      </div>
    </div>
  );
}

