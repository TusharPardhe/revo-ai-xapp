import suitCoinImage from '@assets/suitcoin.svg';

interface FullScreenLoaderProps {
    message?: string;
    loading: boolean;
}

export default function FullScreenLoader({
    message = 'Loading...',
    loading,
}: FullScreenLoaderProps) {
    if (!loading) return null;

    return (
        <div className="loader-container d-flex flex-column  justify-content-center align-items-center">
            <img src={suitCoinImage} alt="Loader" className="loader-image" />
            <p className="fs-5 text-body-secondary mt-2">{message}</p>
        </div>
    );
}
