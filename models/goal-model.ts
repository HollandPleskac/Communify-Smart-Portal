class Goal {
  name: string
  startDate: string
  estimatedFinishDate: string
  completedProjects: number
  unFinishedProjects: number
  id: number

  constructor(name: string, startDate: string, estimatedFinishDate: string, completedProjects:number, unFinishedProjects:number, id:number) {
    this.name = name
    this.startDate = startDate
    this.estimatedFinishDate = estimatedFinishDate
    this.completedProjects = completedProjects
    this.unFinishedProjects = unFinishedProjects
    this.id = id
  }
}

export default Goal
