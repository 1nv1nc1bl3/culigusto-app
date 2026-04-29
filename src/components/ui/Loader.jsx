import { ClipLoader } from 'react-spinners';

export default function Loader() {
    return (
        <div className='flex justify-center items-center'>
            <ClipLoader className='spinning-image' size={150} />
        </div>
    );
}
