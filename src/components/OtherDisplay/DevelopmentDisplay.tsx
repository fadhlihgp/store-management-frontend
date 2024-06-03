function DevelopmentDisplay(){
    return(
        <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
            <img src={'/development.png'} alt={'Failed'}/>
            <div className="text-center">
                <h3 className="mt-4 font-bold text-2xl tracking-tight sm:text-3xl">Maaf, fitur masih dalam tahap pengembangan. Mohon bersabar</h3>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                </div>
            </div>
        </main>

    )
}

export default DevelopmentDisplay
