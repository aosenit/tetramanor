type Props = {
	item: any;
	array: any;
};
function IconDisplay({ item, array }: Props) {
	// const display = item.id && array.find((obj) => obj.id === item.id);

	// console.log(item);
	return (
		<div className="border border-gray-200 rounded-lg px-2 py-2 w-fit flex items-center h-auto">
			{!item.id && (
				<div className="w-2 h-2 bg-[#323539] rounded-full mr-3 flex-shrink-0"></div>
			)}
			<span className="text-[#323539] text-sm whitespace-nowrap overflow-hidden w-full">
				{item.id &&
					(item.icon === "" ?
						//  <img src={item.icon} alt={item.name} />
						<p className="text-green-600 font-semibold">{`TM  ${item.name}`}</p>
					:	<div className="flex gap-2 items-center text-green-700">
							<img src={item.icon} alt={item.name} className="mr-2 h-7 w-7" />
							<p>{item.name}</p>
						</div>)}
                {!item.id && <p>{item}</p>}
			</span>
		</div>
	);
}

export default IconDisplay;
