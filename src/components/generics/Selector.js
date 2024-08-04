"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ArrowDown from "@/components/icons/ArrowDown";

export default function Selector({
	className = "",
	inputClassName = "",
	disabled = false,
	skin = "primary",
	children,
	placeholder,
	name,
	loading = false,
	label,
	renderItem = (item) => item,
	value,
	data,
	labelKey,
	valueKey,
	onSelect,
	...props
}) {
	const [results, setResults] = useState([]);
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const resultContainer = useRef(null);
	const [showResults, setShowResults] = useState(false);
	const [defaultValue, setDefaultValue] = useState("");

	const isDisabled = disabled || loading;

	const onChange = (event) => {
		const { target } = event;
		if (!target.value.trim()) return setResults(data);

		const filteredValue = data.filter((item) => {
			const itemValue = labelKey ? item?.[labelKey] : item;
			return itemValue.toLowerCase().startsWith(target.value.toLowerCase());
		});
		return setResults(filteredValue);
	};

	const handleChange = (e) => {
		handleValueChange(e.target.value);
		onChange && onChange(e);
	};

	const handleSelection = (selectedIndex) => {
		const selectedItem = results[selectedIndex];
		if (!selectedItem) return resetSearchComplete();
		onSelect && onSelect(selectedItem);
		resetSearchComplete();
		setShowResults(false);
	};

	const resetSearchComplete = useCallback(() => {
		setFocusedIndex(-1);
	}, []);

	const handleKeyDown = (e) => {
		const { key } = e;
		let nextIndexCount = 0;

		// move down
		if (key === "ArrowDown")
			nextIndexCount = (focusedIndex + 1) % results.length;

		// move up
		if (key === "ArrowUp")
			nextIndexCount = (focusedIndex + results.length - 1) % results.length;

		// hide search results
		if (key === "Escape") {
			resetSearchComplete();
		}

		// select the current item
		if (key === "Enter") {
			e.preventDefault();
			handleSelection(focusedIndex);
		}

		setFocusedIndex(nextIndexCount);
	};

	const handleValueChange = (value = "") => {
		let finalValue = value;

		if (valueKey) {
			const result = data.find((item) => item[valueKey] === value);

			if (result) {
				finalValue = `${labelKey ? result[labelKey] : result}`;
			}
		}

		setDefaultValue(finalValue);
	};

	useEffect(() => {
		if (!resultContainer.current) return;

		resultContainer.current.scrollIntoView({
			block: "center",
		});
	}, [focusedIndex]);

	useEffect(() => {
		handleValueChange(value);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	useEffect(() => {
		setResults(data);
	}, [data]);

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
				<div
					tabIndex={1}
					onBlur={() => {
						resetSearchComplete();
						setShowResults(false);
					}}
					onKeyDown={handleKeyDown}
					className="relative"
				>
					<input
						onFocus={() => {
							if (results.length > 0) setShowResults(true);
						}}
						value={defaultValue}
						onChange={handleChange}
						type="text"
						name={name}
						className={`w-full overflow-hidden relative z-30 ${skin} ${inputClassName} ${
							isDisabled ? "disabled" : ""
						}`}
						placeholder={placeholder}
						{...props}
					/>
					<ArrowDown
						onClick={() => {
							setShowResults(!showResults);
						}}
						className={`absolute p-2 w-10 h-10 z-30 right-0 me-1 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
							showResults ? "rotate-180" : ""
						}`}
					/>
					{showResults && (
						<div className="absolute w-full rounded-b-md bg-white shadow rounded-br max-h-56 overflow-y-auto z-20 pt-4 -mt-4 border border-slate-200 select-none">
							{results.map((item, index) => {
								return (
									<div
										key={index}
										onMouseDown={() => handleSelection(index)}
										ref={index === focusedIndex ? resultContainer : null}
										className={`cursor-pointer hover:bg-tertiary/10 p-2 ${
											index === focusedIndex ? "bg-tertiary/10" : ""
										}`}
									>
										{renderItem(item)}
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
