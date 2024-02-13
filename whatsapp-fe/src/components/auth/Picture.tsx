import { Dispatch, SetStateAction, useRef, useState } from "react"

interface Props {
    readablePicture: string | ArrayBuffer | null | undefined
    setPicture: Dispatch<SetStateAction<File | undefined>>
    setReadablePicture: Dispatch<string | ArrayBuffer | undefined>
}

const Picture = ({ readablePicture, setPicture, setReadablePicture }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("")
    const handlePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
        let pic = e.target.files![0]
        if (!pic.type.startsWith("image"))
            return setError(`${pic.name} format not supported.`)
        else if (pic.size > 1024 * 1024 * 5)
            return setError(`${pic.name} image too large, maxium 5mb allowed.`)
        else {
            setError("")
            setPicture(pic)
            // reading image
            const reader = new FileReader()
            reader.readAsDataURL(pic)
            reader.onload = e => {
                e.target?.result && setReadablePicture(e.target?.result)
            }
        }
    }

    const handleChangePic = () => {
        setPicture(undefined)
        setReadablePicture(undefined)
        inputRef.current?.click()
    }
    return (
        <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
            <label htmlFor="Picture (Optional)" className="text-small fond-bold tracking-wide">
                Picture (Optional)
            </label>

            {readablePicture ?
                <>
                    <img src={readablePicture as string} className="w-20 object-cover rounded-full" alt="profile user" />
                    <div
                        className="mt-20 py-2 w-20 dark:bg-dark_bg_3 text-xs font-bold rounded-md flex items-center justify-center cursor-pointer"
                        onClick={handleChangePic}
                    >
                        Remove
                    </div>
                </> :
                <div className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
                    onClick={() => inputRef.current?.click()}
                >
                    Upload Picture
                </div>
            }
            <input
                type="file"
                name="picture"
                id="picture" hidden
                ref={inputRef}
                accept="image/png,image/jpeg,image/webp"
                onChange={handlePicture}
            />
            <div className="mt-2">
                <p className="text-red-400">{error}</p>
            </div>
        </div>
    )
}

export default Picture