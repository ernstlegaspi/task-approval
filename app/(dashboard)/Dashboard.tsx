import AddTaskButton from "./AddTaskButton"
import NewTaskCard from "./NewTaskCard"

export default function Dashboard() {
	return <div className="w-full bg-black h-[100vh]">
		<div className="w-[95%] mx-auto pt-12 overflow-x-scroll">
			<AddTaskButton />

			<div className="rounded-sm bg-[#1a1a1a] p-3 mt-4">
				<div className="flex text-white">
					<div className=" py-2 w-[15%] pl-2">Task Title</div>
					<div className=" py-2 w-[15%] ml-1 pl-2">Task Description</div>
					<div className=" py-2 w-[15%] ml-1 pl-2">Assigned To</div>
					<div className=" py-2 w-[10%] ml-1 pl-2">Status</div>
					<div className=" py-2 w-[10%] ml-1 pl-2">Created Date</div>
					<div className=" py-2 w-[10%] ml-1 pl-2">Token</div>
					<div className=" py-2 w-[5%]"></div>
				</div>

				<NewTaskCard />
			</div>
		</div>
	</div>
}
