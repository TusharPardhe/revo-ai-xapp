import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';

interface EscrowFilterButtonProps {
    label: string;
    isSelected: boolean;
    onClick: () => void;
}

export default function EscrowFilterButton({
    label,
    isSelected,
    onClick,
}: EscrowFilterButtonProps) {
    return (
        <Button
            label={label}
            onClick={onClick}
            className={`rounded-4 px-4 me-2 py-2 ${isSelected ? 'text-white bg-black' : 'text-secondary bg-body-secondary'} border-0`}
            style={{
                transition: 'all 0.5s, color 0.2s, box-shadow 0.2s',
                boxShadow: isSelected ? '3px 3px 6px gray' : '0 0 0 0',
            }}
        >
            <Ripple />
        </Button>
    );
}
