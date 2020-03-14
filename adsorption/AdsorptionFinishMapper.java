import org.apache.hadoop.mapreduce.*;
import java.io.IOException;

import org.apache.hadoop.io.*;

public class AdsorptionFinishMapper extends Mapper<LongWritable, Text, Text, Text> {

	@Override
	public void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
		String originAndLabelWeights = value.toString().split("\t")[0];
		if (originAndLabelWeights.contains("-")) {
			String origin = originAndLabelWeights.split("-")[0];
			String labelWeights = originAndLabelWeights.split("-")[1];
			String[] labelAndWeights = labelWeights.split(";");

			for (int i = 0; i < labelAndWeights.length; i++) {
				context.write(new Text(origin), new Text(labelAndWeights[i]));
			}
		}
	}
}