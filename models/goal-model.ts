class Goal {
  name: string
  startDate: string
  estimatedFinishDate: string
  completedProjects: number
  unFinishedProjects: number

  constructor(name: string, startDate: string, estimatedFinishDate: string, completedProjects:number, unFinishedProjects:number) {
    this.name = name
    this.startDate = startDate
    this.estimatedFinishDate = estimatedFinishDate
    this.completedProjects = completedProjects
    this.unFinishedProjects = unFinishedProjects
  }
}

export default Goal
