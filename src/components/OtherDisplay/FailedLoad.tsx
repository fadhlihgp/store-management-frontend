function FailedLoad(){
    return(
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <img src={'/error.png'} alt={'Failed'}/>
            <div className="text-center">
                <h3 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Terdapat kesalahan dalam mengakses halaman</h3>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <button
                        onClick={() => window.location.reload()}
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Refresh Halaman
                    </button>
                </div>
            </div>
        </main>

    )
}

export default FailedLoad
