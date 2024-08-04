"use client";

export default function Input({
	className = "",
	inputClassName = "",
	disabled = false,
	skin = "primary",
	children,
	label,
	name,
	value = "",
	placeholder,
	loading = false,
	type = "text",
	onChange,
	onInput,
	onClick,
	...props
}) {
	const isDisabled = disabled || loading;

	return (
		<div className={className}>
			{label && typeof label === "string" ? (
				<label
					className="block font-medium text-gray-700 mb-2 ms-2"
					htmlFor={name}
				>
					{label}
				</label>
			) : (
				label
			)}

			<div className="relative">
				<div
					className={`pointer-events-none bottom-0 left-0 absolute w-full transition-all duration-300 ${
						isDisabled ? "opacity-100" : "opacity-0"
					}`}
				>
					<div className="w-full loading-bar">
						<div className="loading-bar__progress"></div>
					</div>
				</div>
				<input
					disabled={isDisabled}
					className={`w-full overflow-hidden relative ${skin} ${inputClassName} ${
						isDisabled ? "disabled" : ""
					}`}
					name={name}
					type={type}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					onInput={onInput}
					onClick={onClick}
					{...props}
				/>
			</div>
		</div>
	);
}
