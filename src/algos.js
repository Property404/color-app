export function most_similar(current, colors)
{
    let smallest_index = 0;
    let smallest_weight = 300;
    const red = current.normalized.red;
    const blue = current.normalized.blue;
    const green = current.normalized.green;
    for(let i in colors)
    {
        const c = colors[i].normalized;
        const weight = Math.sqrt((red - c.red) ** 2 + (green - c.green) ** 2 + (blue - c.blue) ** 2);
        if (weight < smallest_weight) {
            smallest_weight = weight;
            smallest_index = i;
        }
    }
    return smallest_index;
}
export function most_accurate(current, colors)
{
    const delta = .005;
    let smallest_weight = .5;
    const red = current.normalized.red;
    const blue = current.normalized.blue;
    const green = current.normalized.green;
    let matches = {};
    let length = 0;
    for(let i in colors)
    {
        const c = colors[i].normalized;
        const weight = Math.sqrt((red - c.red) ** 2 + (green - c.green) ** 2 + (blue - c.blue) ** 2);
        if (weight < smallest_weight) {
            smallest_weight = weight
            matches = {};
            length = 0;
        }
        if(weight<smallest_weight+delta)
        {
            matches[i] = colors[i];
            length++;
        }
    }
    if(length === 0)
        return "!!!!!!!!!!!!!!!!!!!!!!!!!!!";
    const res =  closest(current, matches);
    if(res==0)
        return "???????????????????????????";
    return res;
}
export function closest(current, colors)
{
    let smallest_index = 0;
    let smallest_weight = 800;
    for(let i in colors)
    {
        const c = colors[i];
        const weight = Math.sqrt((current.red-c.red)**2 + (current.green-c.green)**2 + (current.blue - c.blue)**2);
        if(weight< smallest_weight)
        {
            smallest_weight = weight;
            smallest_index = i;
        }
    }
    return smallest_index;
}