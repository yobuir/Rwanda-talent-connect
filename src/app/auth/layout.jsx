
export default function RootLayout({ children }) {
  return ( 
      <div className="relative flex h-screen items-center justify-center bg-white">
          <div
            className="flex  w-full h-full flex-row gap-8 row-start-2 items-center sm:items-start"
          >
            <div className=" flex flex-col flex-1 justify-center items-center h-full">
                <div className=" w-full max-w-md p-8 space-y-6">
                  <h1 className="text-2xl lg:hidden    text-orange-600 font-extrabold">{process.env.APP_NAME}</h1>
                  {children}
                </div>
            </div>
            <div className="space-y-6 lg:flex hidden flex-col flex-1 justify-center items-center h-full bg-orange-600 text-white">
              <h1 className="text-4xl font-bold">{process.env.APP_NAME}</h1>
              <span className=" text-black">{process.env.APP_MOTTO}</span>
            </div>
          </div>
        </div>
  );
}
