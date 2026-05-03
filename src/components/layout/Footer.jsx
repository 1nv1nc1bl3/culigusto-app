export default function Footer() {
    return (
        <footer className='w-full bg-primary text-base-content text-white'>
            <div className='footer flex flex-row justify-between px-8 py-4 w-full'>
                <div className=''>
                    <p className=''>
                        © {new Date().getFullYear()} - All rights reserved by
                        Alkis
                    </p>
                </div>
                <div className=''>
                    <a href='https://www.alkis.me' target='_blank' className=''>
                        My Portfolio
                    </a>
                </div>
            </div>
        </footer>
    );
}
