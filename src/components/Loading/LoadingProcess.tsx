interface ILoadingProcess {
    loadingName?: string
}

export const LoadingProcess = ({loadingName = "Loading"}: ILoadingProcess) => {
  return(
      <div className="w-full h-full flex justify-center items-center flex-col ">
          <div>
              <span className="loading loading-bars loading-lg"></span>
          </div>
          <div>
              {loadingName}
          </div>
      </div>
  )
}
