import argparse
import json

parser = argparse.ArgumentParser(description='Update project name and task name')
parser.add_argument('-n','--projectName', help='Name of the project', required=True, metavar="", type=str)
parser.add_argument('-t','--taskName', nargs='+', help='Name of the task', required=True, metavar="", type=str)
parser.add_argument('-it','--iteration', nargs='+', help='Name of the task', required=True, metavar="", type=str)
parser.add_argument('-f','--fileName', help='Name of the file', required=True, metavar="", type=str)
args = parser.parse_args()

project = args.projectName
taskList = args.taskName
iterationList = args.iteration

Project_Name, Project_Id, Task_Id, Task_Name, Iteration = [], [], [], [], []

for t in taskList :
    itr = iterationList[taskList.index(t)]

    def report_scalars(logger):
        # # type: (Logger) -> ()
        """
        reporting scalars to scalars section
        :param logger: The task.logger to use for sending the scalars
        """
        # report two scalar series on the same graph
        for i in range(int(itr)):
            logger.report_scalar(title="unified graph", series="series A", iteration=i, value=1. / (i + 1))
            logger.report_scalar(title="unified graph", series="series B", iteration=i, value=10. / (i + 1))

        # report two scalar series on two different graphs
        for i in range(int(itr)):
            logger.report_scalar(title="graph A", series="series A", iteration=i, value=1. / (i + 1))
            logger.report_scalar(title="graph B", series="series B", iteration=i, value=10. / (i + 1))

        # report single scalars
        logger.report_single_value(name="metric A", value=486)
        logger.report_single_value(name="metric B", value=305.95)
        logger.report_single_value(name="metric C", value=400.95)

    def main():
        # from here on everything is logged automatically
        task = Task.init(project_name=project, task_name=t)

        print('reporting scalar graphs')

        # Get the task logger,
        logger = task.get_logger()

        # report scalars
        report_scalars(logger)

        logger.flush()

        print('We are done reporting, have a great day :)')
        task.close()
        task.publish()

        Project_Id.append(task.project)
        Project_Name.append(project)
        Task_Id.append(task.id)
        Task_Name.append(t)
        Iteration.append(itr)

    if __name__ == "__main__":
        main()

output = [{"Project_Name": pn, "Project_Id": pi, "Task_Id": ti, "Task_Name": tn, "Iteration": itrs} for pn, pi, ti, tn, itrs in zip(Project_Name, Project_Id, Task_Id, Task_Name, Iteration)]

json_object = json.dumps(output, indent=4)
with open("cypress/data/%s" % args.fileName, "w") as outfile:
    outfile.write(json_object)