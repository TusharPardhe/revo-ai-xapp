import { Button, ButtonProps } from 'primereact/button';

interface FilledButtonProps {
    label: string;
    onClick: () => void;
    buttonStyles?: React.CSSProperties;
    buttonClassName?: string;
}

export default function FilledButton({
    label,
    onClick,
    buttonStyles,
    buttonClassName,
    ...props
}: FilledButtonProps & ButtonProps) {
    return (
        <Button
            label={label}
            onClick={onClick}
            className={`rounded-4 ${buttonClassName}`}
            severity="secondary"
            style={{
                borderColor: 'wheat',
                backgroundColor: '#f5deb37d',
                color: '#695b40',
                ...buttonStyles,
            }}
            {...props}
        />
    );
}
